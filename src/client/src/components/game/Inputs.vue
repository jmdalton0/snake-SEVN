<template>
    <div></div>
</template>

<script>
export default {
    name: 'InputsComponent',
    data() {
        return {
            xDown: null,
            yDown: null,
            xUp: null,
            yUp: null,
        }
    },
    methods: {
        input(direction) {
            this.$emit('input', direction);
        },
        init() {
            document.onkeydown = (key) => {
                key = key.key || key.keyCode;
                if (key === '8') {
                    this.input('n');
                } else if (key === '5') {
                    this.input('s');
                } else if (key === '6') {
                    this.input('e');
                } else if (key === '4') {
                    this.input('w');
                } else {
                    this.input('?');
                }
            }

            document.addEventListener('touchstart', (e) => {
                this.xDown = e.touches[0].screenX;
                this.yDown = e.touches[0].screenY;
            });

            document.addEventListener('touchmove', (e) => {
                this.xUp = e.touches[0].screenX;
                this.yUp = e.touches[0].screenY;
            });

            document.addEventListener('touchend', () => {
                if (this.xDown && this.yDown && this.xUp && this.yUp) {
                    const xDelta = this.xDown - this.xUp;
                    const yDelta = this.yDown - this.yUp;

                    if (Math.abs(xDelta) > Math.abs(yDelta)) {
                        if (xDelta > 0) {
                            this.input('w');
                        } else {
                            this.input('e');
                        }
                    } else {
                        if (yDelta > 0) {
                            this.input('n');
                        } else {
                            this.input('s');
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.init();
    }
}
</script>