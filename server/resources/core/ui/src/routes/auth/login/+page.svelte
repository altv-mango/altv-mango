<script lang="ts">
    import Icon from '@iconify/svelte';

    async function loginWithCloud() {
        await window.mango.rpc.callServer('login', { provider: 'cloud' });
    }

    async function loginWithDiscord() {
        const result = await window.mango.rpc.callPlayer('requestDiscordToken', { timeout: 10000 });
        await window.mango.rpc.callServer('login', { provider: 'discord', token: result.body });
        // await window.mango.rpc.callPlayer('showMainMenuScene');
    }
</script>

<div class="flex min-h-screen justify-start items-center p-4 sm:p-12 md:p-20 lg:p-28 xl:p-36">
    <div class="card card-bordered bg-base-100 w-full max-w-sm animate-fade-right">
        <div class="card-body space-y-2">
            <h2 class="card-title justify-center">LOGIN WITH</h2>
            <div class="card-actions">
                <button type="button" class="btn btn-md btn-block" on:click={loginWithCloud}><Icon icon="mdi:cloud-key" /> Cloud</button>
                <button type="button" class="btn btn-md btn-block" on:click={loginWithDiscord}>
                    <Icon icon="ic:baseline-discord" /> Discord
                </button>
            </div>
        </div>
    </div>
</div>
