var Screen = function(canvas) {
    canvas.mods = {};
    canvas.modenabled = {};
    canvas.moddisabled = {};
    canvas.modticks = {};

    canvas.modOn = function(mod) {
        this.mods[mod] = true;
        if(mod in this.modenabled) {
            this.modenabled[mod].bind(this)();
        }
    };

    canvas.modOff = function(mod) {
        this.mods[mod] = false;
        if(mod in this.moddisabled) {
            this.moddisabled[mod].bind(this)();
        }
    };

    canvas.modTick = function() {
        for(var mod in this.mods) {
            if(this.mods[mod]) {
                if(mod in this.modticks) {
                    this.modticks[mod].bind(this)();
                }
            }
        }
    };

    setupMods(canvas);

    return canvas;
}

function setupMods(screen) {
    // Rotate & scale
    screen.modenabled["rotscale"] = function() {
        this.ang = 0;
        this.angdelta = 0.06;
        this.scale = 1;
        this.scaledelta = 1.02;
    }

    screen.modticks["rotscale"] = function() {
        this.ang += this.angdelta;
        if(Math.abs(this.ang) > Math.PI / 8) {
            this.angdelta *= -1;
        }

        this.scale *= this.scaledelta;
        if(this.scale > 1.15 || this.scale < 0.85) {
            this.scaledelta = 1 / this.scaledelta;
        }

        $(this).css("transform", "rotate(" + this.ang + "rad) scale(" + this.scale + ")");
    }

    screen.moddisabled["rotscale"] = function() {
        $(this).css("transform", "");
    }

    // Shake
    screen.modenabled["shake"] = function() {
        this.shakex = 11;
        this.shakey = 0;
        this.shakedx = 0;
        this.shakedy = 0;
        $(this).css("position", "relative");
    }

    screen.modticks["shake"] = function() {
        this.shakex += this.shakedx;
        this.shakey += this.shakedy;
        var a = Math.atan2(this.shakey, this.shakex);
        var r = Math.sqrt(this.shakex*this.shakex + this.shakey*this.shakey);
        if(r > 10) {
            var b = a + Math.random() * Math.PI/2 + Math.PI/2;
            this.shakedx = 10 * Math.cos(b);
            this.shakedy = 10 * Math.sin(b);
        }
        $(this).css("left", this.shakex + "px");
        $(this).css("top", this.shakey + "px");
    }

    screen.moddisabled["shake"] = function() {
        $(this).css("left", "");
        $(this).css("top", "");
        $(this).css("position", "");
    }
}
