
var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo) {
    CP.dashedLine = function (x, y, x2, y2, dashArray) {
        if (!dashArray) dashArray = [10, 5];
        var dashCount = dashArray.length;
        var dx = (x2 - x);
        var dy = (y2 - y);
        var xSlope = (Math.abs(dx) > Math.abs(dy));
        var slope = (xSlope) ? dy / dx : dx / dy;

        this.moveTo(x, y);
        var distRemaining = Math.sqrt(dx * dx + dy * dy);
        var dashIndex = 0;
        while (distRemaining >= 0.1) {
            var dashLength = Math.min(distRemaining, dashArray[dashIndex % dashCount]);
            var step = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
            if (xSlope) {
                if (dx < 0) step = -step;
                x += step;
                y += slope * step;
            } else {
                if (dy < 0) step = -step;
                x += slope * step;
                y += step;
            }
            this[(dashIndex % 2 == 0) ? 'lineTo' : 'moveTo'](x, y);
            distRemaining -= dashLength;
            dashIndex++;
        }
    };
    CP.dashedRect = function (x, y, w, h, dashArray) {
        //        this.strokeRect(x, y, w, h);

        this.dashedLine(x, y, x + w, y, dashArray);
        this.dashedLine(x + w, y, x + w, y + h, dashArray);
        this.dashedLine(x, y + h, x + w, y + h, dashArray);
        this.dashedLine(x, y + h, x, y, dashArray);
        this.stroke();
    };

}