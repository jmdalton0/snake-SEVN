<template>
    <Screen
        name="controls"
        label="play"
    >
        <div class="controls">
            <h2>Controls</h2>
            <p><span className="control arrow">&uarr;</span></p>
            <p><span className="control key-control">8</span></p>
            <p>
                <span className="control arrow">&larr;</span>
                <span className="control key-control">4</span>
                <span className="control key-control">5</span>
                <span className="control key-control">6</span>
                <span className="control swipe-control">SWIPE</span>
                <span className="control arrow">&rarr;</span>
            </p>
            <p><span className="control arrow">&darr;</span></p>
        </div>
   </Screen>
</template>

<script>
import Screen from './Screen.vue';
export default {
    name: 'ControlsComponent',
    components: {
        Screen,
    }
}
</script>

<style>
.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.control {
    font-size: 3rem;
    margin: 0 1rem;
}

.key-control {
    display: inline-block;
}

.swipe-control {
    display: none;
}

.arrow {
    color: var(--primary-dark);
}

@media (max-width: 1024px) {
    .control {
        font-size: 2rem;
    }

    .key-control {
        display: none;
    }

    .swipe-control {
        display: inline-block;
    }
}
</style>