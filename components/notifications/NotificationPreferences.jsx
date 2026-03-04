'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  Smartphone,
  Monitor,
  Volume2,
  Moon,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { defaultPreferences, NotificationCategory } from './notificationData';
import { toast } from 'sonner';
import { 
  subscribeUser, 
  unsubscribeUser, 
  isPushSupported,
  getNotificationPermission,
  isSubscribed 
} from '@/lib/subscribePush';
import { useNotificationStore } from '@/store/notificationStore';

export default function NotificationPreferences({ open, onOpenChange }) {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [hasChanges, setHasChanges] = useState(false);
  const [pushPermission, setPushPermission] = useState('default');
  const [isPushSubscribed, setIsPushSubscribed] = useState(false);
  const [checkingPush, setCheckingPush] = useState(true);
  
  const { getPreferences, updatePreferences } = useNotificationStore();

  // Check push notification status on mount
  useEffect(() => {
    const checkPushStatus = async () => {
      if (isPushSupported()) {
        const permission = getNotificationPermission();
        setPushPermission(permission);
        
        const subscribed = await isSubscribed();
        setIsPushSubscribed(subscribed);
      }
      setCheckingPush(false);
    };

    if (open) {
      checkPushStatus();
      loadPreferences();
    }
  }, [open]);

  // Load preferences from backend
  const loadPreferences = async () => {
    const prefs = await getPreferences();
    if (prefs) {
      // Ensure all category values are booleans
      const backendPrefs = prefs.preferences || {};
      const categoryDefaults = {
        [NotificationCategory.SYSTEM]: false,
        [NotificationCategory.EVENTS]: false,
        [NotificationCategory.PAYMENTS]: false,
        [NotificationCategory.ALERTS]: false,
        [NotificationCategory.SOCIAL]: false,
      };
      
      // Map backend preferences to local state with explicit boolean conversions
      setPreferences({
        push: {
          enabled: !!prefs.push_enabled,
          categories: {
            ...categoryDefaults,
            ...Object.fromEntries(
              Object.entries(backendPrefs).map(([k, v]) => [k, !!v])
            ),
          },
        },
        inApp: {
          enabled: !!prefs.in_app_enabled,
          categories: {
            ...categoryDefaults,
            ...Object.fromEntries(
              Object.entries(backendPrefs).map(([k, v]) => [k, !!v])
            ),
          },
        },
        quietHours: {
          enabled: !!prefs.quiet_hours_enabled,
          startTime: prefs.quiet_hours_start || '22:00',
          endTime: prefs.quiet_hours_end || '08:00',
        },
        soundEnabled: prefs.notification_sound !== false,
        desktopNotifications: prefs.desktop_notifications !== false,
      });
    }
  };

  // Handle push notification toggle
  const handleTogglePush = async (enabled) => {
    if (enabled) {
      // Enable push notifications
      if (pushPermission === 'denied') {
        toast.error('Push notifications are blocked. Please enable them in your browser settings.');
        return;
      }

      const success = await subscribeUser();
      if (success) {
        setIsPushSubscribed(true);
        setPushPermission('granted');
        setPreferences((prev) => ({
          ...prev,
          push: {
            ...prev.push,
            enabled: true,
          },
        }));
        setHasChanges(true);
      }
    } else {
      // Disable push notifications
      const success = await unsubscribeUser();
      if (success) {
        setIsPushSubscribed(false);
        setPreferences((prev) => ({
          ...prev,
          push: {
            ...prev.push,
            enabled: false,
          },
        }));
        setHasChanges(true);
      }
    }
  };

  const handleToggleChannel = (channel) => {
    setPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        enabled: !prev[channel].enabled,
      },
    }));
    setHasChanges(true);
  };

  const handleToggleCategory = (channel, category) => {
    setPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        categories: {
          ...prev[channel].categories,
          [category]: !prev[channel].categories[category],
        },
      },
    }));
    setHasChanges(true);
  };

  const handleToggleQuietHours = () => {
    setPreferences((prev) => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled: !prev.quietHours.enabled,
      },
    }));
    setHasChanges(true);
  };

  const handleToggleSetting = (setting) => {
    setPreferences((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    // Save to backend
    const updates = {
      push_enabled: preferences.push.enabled,
      in_app_enabled: preferences.inApp.enabled,
      preferences: {
        ...preferences.push.categories,
        ...preferences.inApp.categories,
      },
      quiet_hours_enabled: preferences.quietHours.enabled,
      quiet_hours_start: preferences.quietHours.startTime,
      quiet_hours_end: preferences.quietHours.endTime,
      notification_sound: preferences.soundEnabled,
      desktop_notifications: preferences.desktopNotifications,
    };

    const result = await updatePreferences(updates);
    if (result) {
      setHasChanges(false);
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
    toast.info('Preferences reset to default');
  };

  const categories = [
    {
      value: NotificationCategory.SYSTEM,
      label: 'System',
      description: 'System updates and maintenance notifications',
    },
    {
      value: NotificationCategory.EVENTS,
      label: 'Events',
      description: 'Event registrations, updates, and reminders',
    },
    {
      value: NotificationCategory.PAYMENTS,
      label: 'Payments',
      description: 'Payment confirmations and transaction updates',
    },
    {
      value: NotificationCategory.ALERTS,
      label: 'Alerts',
      description: 'Security alerts and important notifications',
    },
    {
      value: NotificationCategory.SOCIAL,
      label: 'Social',
      description: 'Follows, mentions, and social interactions',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </DialogTitle>
          <DialogDescription>
            Customize how and when you receive notifications
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="channels" className="flex-1">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="max-h-125 px-6 py-4">
            {/* Channels Tab */}
            <TabsContent value="channels" className="space-y-4 mt-0">
              {/* Push Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Push Notifications
                          {isPushSubscribed && (
                            <Badge variant="success" className="text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Receive push notifications on your devices
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={!!(preferences.push?.enabled && isPushSubscribed)}
                      onCheckedChange={handleTogglePush}
                      disabled={checkingPush}
                    />
                  </div>
                </CardHeader>

                {/* Push permission alert */}
                {!isPushSupported() && (
                  <CardContent className="pt-0">
                    <Alert variant="warning">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Push notifications are not supported in this browser.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                )}

                {isPushSupported() && pushPermission === 'denied' && (
                  <CardContent className="pt-0">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Push notifications are blocked. Please enable them in your browser settings.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                )}

                {isPushSupported() && pushPermission === 'default' && !isPushSubscribed && (
                  <CardContent className="pt-0">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Click the toggle above to enable push notifications. You&apos;ll be asked for permission.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                )}

                {(preferences.push?.enabled || isPushSubscribed) && (
                  <CardContent className="space-y-3 pt-0">
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      Choose which categories to receive as push notifications:
                    </p>
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <Label className="text-sm font-medium">
                            {cat.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {cat.description}
                          </p>
                        </div>
                        <Switch
                          checked={!!preferences.push?.categories?.[cat.value]}
                          onCheckedChange={() =>
                            handleToggleCategory('push', cat.value)
                          }
                          disabled={!isPushSubscribed}
                        />
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* In-App Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Monitor className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>In-App Notifications</CardTitle>
                        <CardDescription>
                          Receive notifications while using the app
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={!!preferences.inApp?.enabled}
                      onCheckedChange={() => handleToggleChannel('inApp')}
                    />
                  </div>
                </CardHeader>
                {preferences.inApp?.enabled && (
                  <CardContent className="space-y-3 pt-0">
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      Choose which categories to show in-app:
                    </p>
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <Label className="text-sm font-medium">
                            {cat.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {cat.description}
                          </p>
                        </div>
                        <Switch
                          checked={!!preferences.inApp?.categories?.[cat.value]}
                          onCheckedChange={() =>
                            handleToggleCategory('inApp', cat.value)
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-4 mt-0">
              <div className="space-y-4">
                {categories.map((cat) => (
                  <Card key={cat.value}>
                    <CardHeader>
                      <CardTitle className="text-base">{cat.label}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <Label>Push</Label>
                        </div>
                        <Switch
                          checked={!!preferences.push?.categories?.[cat.value]}
                          onCheckedChange={() =>
                            handleToggleCategory('push', cat.value)
                          }
                          disabled={!preferences.push?.enabled}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-muted-foreground" />
                          <Label>In-App</Label>
                        </div>
                        <Switch
                          checked={!!preferences.inApp?.categories?.[cat.value]}
                          onCheckedChange={() =>
                            handleToggleCategory('inApp', cat.value)
                          }
                          disabled={!preferences.inApp?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-0">
              {/* Quiet Hours */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Moon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Quiet Hours</CardTitle>
                        <CardDescription>
                          Mute notifications during specific hours
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={!!preferences.quietHours?.enabled}
                      onCheckedChange={handleToggleQuietHours}
                    />
                  </div>
                </CardHeader>
                {preferences.quietHours?.enabled && (
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label className="text-sm">Start Time</Label>
                        <p className="text-2xl font-bold mt-1">
                          {preferences.quietHours?.startTime}
                        </p>
                      </div>
                      <span className="text-muted-foreground">to</span>
                      <div className="flex-1">
                        <Label className="text-sm">End Time</Label>
                        <p className="text-2xl font-bold mt-1">
                          {preferences.quietHours?.endTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Sound */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Volume2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Notification Sounds</CardTitle>
                        <CardDescription>
                          Play sound for new notifications
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={!!preferences.soundEnabled}
                      onCheckedChange={() => handleToggleSetting('soundEnabled')}
                    />
                  </div>
                </CardHeader>
              </Card>

              {/* Desktop Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Monitor className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Desktop Notifications</CardTitle>
                        <CardDescription>
                          Show desktop notifications when app is in background
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={!!preferences.desktopNotifications}
                      onCheckedChange={() =>
                        handleToggleSetting('desktopNotifications')
                      }
                    />
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={handleReset}>
              Reset to Default
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
