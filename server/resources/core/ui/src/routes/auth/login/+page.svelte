<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import Icon from '@iconify/svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { MyEvent } from '@shared/enums';

    let loading = false;

    async function loginWithDiscord() {
        loading = true;
        const result = await window.mango.rpc.callPlayer('requestDiscordToken', { timeout: 10000 });
        await window.mango.rpc.callServer('login', { provider: 'discord', token: result.body });
        goto('/main-menu');
    }

    onMount(async () => {
        window.mango.logger.debug('This is a test log');
        const result = await window.mango.rpc.callPlayer('TEST_RPC', { message: 'This is a test message' });
        window.mango.logger.debug('RPC response:', result);

        window.mango.event.onServer(MyEvent.EatMango, (body) => {});
    });
</script>

<div class="flex min-h-screen justify-start items-center p-4 sm:p-12 md:p-20 lg:p-28 xl:p-36">
    <Card.Root class="max-w-xs w-full animate-fade-right">
        <Card.Header>
            <Card.Title>Login with</Card.Title>
            <Card.Description>Choose a provider to login with</Card.Description>
        </Card.Header>
        <Card.Content>
            {#if loading}
                <div class="flex justify-center items-center">
                    <Icon icon="line-md:loading-loop" class="h-8 w-8" />
                </div>
            {:else}
                <Button class="w-full" on:click={loginWithDiscord}>
                    <Icon icon="ic:baseline-discord" class="mr-2 h-4 w-4" /> Discord
                </Button>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
