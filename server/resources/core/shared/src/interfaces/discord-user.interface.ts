export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner?: string;
    accent_color?: number;
    global_name?: string;
    avatar_decoration_data?: string;
    banner_color?: number;
    mfa_enabled: boolean;
    locale: string;
}
