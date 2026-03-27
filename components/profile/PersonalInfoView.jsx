"use client";

import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import {
    IconUser,
    IconEdit,
    IconMapPin2,
    IconMail,
    IconPhone,
    IconGenderMale,
    IconGenderFemale,
    IconUserQuestion,
    IconEyeOff
} from "@tabler/icons-react";

const genderOptions = {
    male: { label: "Male", icon: IconGenderMale },
    female: { label: "Female", icon: IconGenderFemale },
    other: { label: "Other", icon: IconUserQuestion },
    prefer_not_to_say: { label: "Prefer not to say", icon: IconEyeOff }
};

export function PersonalInfoView({ user, onEdit, className }) {
    const selectedGender = user?.gender ? genderOptions[user.gender] : null;

    const infoItems = [
        {
            label: "Full Name",
            value: user?.name,
            icon: IconUser,
            placeholder: "Not provided"
        },
        {
            label: "Email Address",
            value: user?.email,
            icon: IconMail,
            placeholder: "Not provided"
        },
        {
            label: "Phone Number",
            value: user?.phone_number,
            icon: IconPhone,
            placeholder: "Not provided"
        },
        {
            label: "Address",
            value: user?.address,
            icon: IconMapPin2,
            placeholder: "Not provided"
        },
        {
            label: "Gender",
            value: selectedGender?.label,
            icon: selectedGender?.icon || IconUser,
            placeholder: "Not specified"
        }
    ];

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="border-b pb-2 flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 p-0">
                    <IconUser className="h-5 w-5" />
                    Personal Information
                </CardTitle>
                <CardAction className={'p-0'}>
                    <Button size="sm" variant="outline" onClick={onEdit}>
                        <IconEdit className="h-4 w-4" />
                        Edit Profile
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="">
                <div className="grid gap-4 md:grid-cols-2">
                    {infoItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {item.label}
                                    </span> 
                                </div>
                                <div className="ml-6">
                                    {item.value ? (
                                        <p className="text-foreground font-medium">
                                            {item.value}
                                        </p>
                                    ) : (
                                        <Badge variant="outline" className="text-xs">
                                            {item.placeholder}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}