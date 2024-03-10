<script lang="ts">
    import { onMount } from 'svelte';

    onMount(async () => {
        window.mango.event.emitServer('prepareMainMenuScene');
        window.mango.event.emitPlayer('showMainMenuScene');
    });
</script>
