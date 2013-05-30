var Screen = function(canvas) {
    canvas.mods = {};
    canvas.modenabled = {};
    canvas.moddisabled = {};
    canvas.modticks = {};

    canvas.modOn = function(name) {
        if(name in this.mods) {
            this.mods[name].enabled = true;
            this.mods[name].init(this);
        }
    };

    canvas.modOff = function(name) {
        if(name in this.mods) {
            this.mods[name].enabled = false;
            this.mods[name].takedown(this);
        }
    };

    canvas.modTick = function() {
        for(var mod in this.mods) {
            if(this.mods[mod].enabled) {
                this.mods[mod].tick(this);
            }
        }
    };

    setupMods(canvas);

    return canvas;
}

function setupMods(screen) {
    // Rotate & scale
    screen.mods["rotscale"] = {
        enabled: false,
        init: function(screen) {
            this.ang = 0;
            this.angdelta = 0.06;
            this.scale = 1;
            this.scaledelta = 1.02;
        },
        tick: function(screen) {
            this.ang += this.angdelta;
            if(Math.abs(this.ang) > Math.PI / 8) {
                this.angdelta *= -1;
            }

            this.scale *= this.scaledelta;
            if(this.scale > 1.15 || this.scale < 0.85) {
                this.scaledelta = 1 / this.scaledelta;
            }

            $(screen).css("transform",
                "rotate(" + this.ang + "rad) scale(" + this.scale + ")");
        },
        takedown: function(screen) {
            $(screen).css("transform", "");
        }
    };

    // Shake
    screen.mods["shake"] = {
        enabled: false,
        init: function(screen) {
            this.shakex = 11;
            this.shakey = 0;
            this.shakedx = 0;
            this.shakedy = 0;
            $(screen).css("position", "relative");
        },
        tick: function(screen) {
            this.shakex += this.shakedx;
            this.shakey += this.shakedy;
            var a = Math.atan2(this.shakey, this.shakex);
            var r = Math.sqrt(this.shakex*this.shakex + this.shakey*this.shakey);
            if(r > 10) {
                var b = a + Math.random() * Math.PI/2 + Math.PI/2;
                this.shakedx = 10 * Math.cos(b);
                this.shakedy = 10 * Math.sin(b);
            }
            $(screen).css("left", this.shakex + "px");
            $(screen).css("top", this.shakey + "px");
        },
        takedown: function(screen) {
            $(screen).css("left", "");
            $(screen).css("top", "");
            $(screen).css("position", "");
        }
    };
}
