# Authentication Popup Integration

This implementation allows authentication in a popup window with communication back to the parent window.

## How It Works

When `popup=true` is added to the auth URL, the authentication flow will:
1. Complete the authentication process normally
2. Send a success message to the parent window using `postMessage`
3. Close the popup window

### Message Format

The popup sends this message to the parent window on successful authentication:

```javascript
{
  type: 'AUTH_SUCCESS',
  success: true,
  method: 'password' | 'passkey' | '2fa',  // How the user authenticated
  token: 'string'  // Access token (only for OAuth flows)
}
```

## Usage

### Quick Start (Recommended)

Use the provided React hook for the easiest integration:

```javascript
import { useAuthPopup } from '@/hooks/useAuthPopup';

function MyComponent() {
  const { openAuth, isLoading, error } = useAuthPopup();

  const handleLogin = async () => {
    try {
      const result = await openAuth('login');
      console.log('Auth successful!', result);
      // User is now authenticated
    } catch (err) {
      console.error('Auth failed:', err);
    }
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Authenticating...' : 'Login'}
    </button>
  );
}
```

### Manual Integration

If you need more control, use the helper functions directly:

```javascript
import { authenticateWithPopup } from '@/lib/authPopup';

// Open popup and wait for result
authenticateWithPopup('/auth?popup=true&view=login')
  .then(data => {
    console.log('Success!', data);
    // Handle successful authentication
  })
  .catch(error => {
    console.error('Failed!', error);
  });
```

### Listen for Messages Only

If you want to open the popup yourself and just listen for the result:

```javascript
import { openAuthPopup, listenForAuthSuccess } from '@/lib/authPopup';

// Open the popup
const popup = openAuthPopup('/auth?popup=true&view=login');

// Listen for success message
const cleanup = listenForAuthSuccess(
  (data) => {
    console.log('Auth successful:', data);
    cleanup(); // Remove listener
  },
  (error) => {
    console.error('Auth error:', error);
    cleanup();
  }
);
```

## Authentication Methods

The popup supports all authentication methods:

- **Password Login** - Returns `{ method: 'password' }`
- **Passkey Login** - Returns `{ method: 'passkey' }`
- **Google OAuth** - Returns `{ method: 'password', token: '...' }`
- **2FA** - Returns `{ method: '2fa' }`

## URL Parameters

- `popup=true` - Required. Enables popup mode
- `view=login|signup|forgot` - Optional. Sets the initial view

### Examples

```
/auth?popup=true                    # Opens to login
/auth?popup=true&view=signup        # Opens to signup
/auth?popup=true&view=login         # Opens to login
/auth?popup=true&view=forgot        # Opens to forgot password
```

## Security Notes

1. **Origin Verification**: Messages are verified to come from the same origin
2. **Message Type**: Only `AUTH_SUCCESS` messages are processed
3. **HTTPS**: Always use HTTPS in production for secure postMessage communication

## Files

- `/lib/authPopup.js` - Helper functions for popup management
- `/hooks/useAuthPopup.js` - React hook and example components
- `/app/auth/page.jsx` - Auth page with popup support
- `/components/Auth/` - Auth components with popup integration

## Testing

To test the popup flow:

1. Create a test page with a button
2. Click button to open `/auth?popup=true`
3. Complete authentication
4. Verify the popup closes and message is received

```javascript
<button onClick={() => {
  listenForAuthSuccess(data => console.log('Received:', data));
  window.open('/auth?popup=true', 'test', 'width=500,height=700');
}}>
  Test Auth Popup
</button>
```
