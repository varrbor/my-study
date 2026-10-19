# Demo: Configure MultiFactor Authentication on the Root Account

The root account has unrestricted access to the entire AWS account and should be secured first. Configuring MFA on root is done via IAM > Security Credentials > Assign MFA device, where you can register a virtual authenticator app (like Google Authenticator), a hardware security key, or an SMS-based device. Once enabled, logging in as root requires both the password and the current MFA code, significantly reducing the risk of a catastrophic account takeover.
