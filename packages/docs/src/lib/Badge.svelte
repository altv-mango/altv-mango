<script lang="ts">
    export let color: 'green' | 'blue' | 'yellow' = 'green';
</script>

<div
    class="badge"
    class:badge-green={color === 'green'}
    class:badge-blue={color === 'blue'}
    class:badge-yellow={color === 'yellow'}
>
    <slot />
</div>

<style>
    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: -moz-fit-content;
        width: fit-content;
        padding-left: 0.563rem;
        padding-right: 0.563rem;
        border-width: 2px;
        border-radius: 0.5rem;
    }

    .badge-green {
        border-color: hsl(120, 94%, 31%);
        background-color: hsl(120, 94%, 31%);
        color: hsl(120, 90%, 100%);
    }

    .badge-blue {
        border-color: hsl(210, 100%, 40%);
        background-color: hsl(210, 100%, 40%);
        color: hsl(210, 100%, 100%);
    }

    .badge-yellow {
        border-color: hsl(22, 90%, 46%);
        background-color: hsl(22, 90%, 46%);
        color: hsl(45, 100%, 100%);
    }
</style>
