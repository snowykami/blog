let latestPoint = null; // {x, y}
let latestArc = null;   // {center, radius, startAngle, endAngle, direction}
let latestTangent = null; // 上一个切向量
let isArc = false;   // 上一段是否为弧线

const dotSize = 4;  // 粒子大小
const pdis = 6;  // 粒子间距

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(p) {
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    }
}

class Line {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // 获取直线过某点的垂线
    getVerticalLine(p) {
        return new Line(-this.b, this.a, this.b * p.x - this.a * p.y);
    }

    // 获取两直线的交点
    getIntersection(l) {
        const d = this.a * l.b - this.b * l.a;
        if (d === 0) {
            return null;
        }
        return new Point((this.b * l.c - this.c * l.b) / d, (this.c * l.a - this.a * l.c) / d);
    }

    directionVector() {
        return new Vector(this.a, this.b);
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    reverse() {
        return new Vector(-this.x, -this.y);
    }
    // 获取两向量的夹角
    getAngle(v){
        // return Math.acos(self * vector2 / (self.length * vector2.length))
        return Math.acos(this.dotProduct(v) / (this.getLength() * v.getLength()));
    }

    // 获取向量的模
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // 点乘
    dotProduct(v) {
        return this.x * v.x + this.y * v.y;
    }
}

class Arc {
    constructor(center, startPoint, endPoint, direction) {
        this.center = center;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.direction = direction;

        this.radius = center.distanceTo(startPoint)
    }

    draw() {
        // 弧长公式，用圆心角和半径

        const length = this.radius * Math.abs(this.getDeltaAngle());
        const steps = length / pdis;  // 步数
        for (let i = 0; i < steps; i++) {
            const angle = this.direction * i / steps * this.getDeltaAngle();
            const x = this.center.x + this.radius * Math.cos(angle);
            const y = this.center.y + this.radius * Math.sin(angle);
            createParticle(x, y, '#2297ff', dotSize, 1000);
        }
    }


    getDeltaAngle() {
        const v1 = getVectorByTwoPoints(this.center, this.startPoint);
        const v2 = getVectorByTwoPoints(this.center, this.endPoint);
        // Calculate positive/negative angles
        const angle1 = Math.atan2(v1.y, v1.x);
        const angle2 = Math.atan2(v2.y, v2.x);

        // Calculate angular difference
        let deltaAngle = angle2 - angle1;

        // Adjust the difference based on rotation direction
        if (this.direction > 0) {
            if (deltaAngle < 0) {
                deltaAngle += 2 * Math.PI;
            }
        } else {
            if (deltaAngle > 0) {
                deltaAngle -= 2 * Math.PI;
            }
        }
        return deltaAngle;
    }


}

class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;

        this.line = getLineByTwoPoints(this.p1, this.p2);
    }

    // 获取中点
    getMidPoint() {
        return new Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
    }

    // 获取中垂线
    getBiSector() {
        return this.line.getVerticalLine(this.getMidPoint())
    }
}

function getLineByTwoPoints(p1, p2) {
    return new Line(p2.y - p1.y, p1.x - p2.x, p2.x * p1.y - p1.x * p2.y);
}

function getLineByPointAndVector(p, v) {
    return new Line(v.y, -v.x, v.x * p.y - v.y * p.x);
}

function getVectorByTwoPoints(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
}

function createParticle(x, y, color = '#2297ff', size = 10, life = 1000) {
    // 在指定位置放置一个粒子
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.backgroundColor = color;
    particle.style.position = 'absolute';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    document.body.appendChild(particle);
}

function drawLine(p1, p2, duration=300) {
    // 开新线程绘制渐变线，每次绘一个点，1秒画完全程
    const dis = p1.distanceTo(p2);
    const steps = dis / pdis;  // 步数
    // 循环
    for (let i = 0; i < steps; i++) {
        // createParticle(p1.x + (p2.x - p1.x) * i / steps, p1.y + (p2.y - p1.y) * i / steps, '#2297ff', 4, 1000);
        setTimeout(() => {
            createParticle(p1.x + (p2.x - p1.x) * i / steps, p1.y + (p2.y - p1.y) * i / steps, '#2297ff', dotSize, duration*0.75);
        }, i * duration / steps);
    }
}

document.body.addEventListener('click', function (event) {
    let thisPoint = new Point(event.clientX + window.scrollX, event.clientY + window.scrollY);
    createParticle(thisPoint.x, thisPoint.y, '#2297ff', 10, 1000);
    if (latestPoint != null) {
        if (latestTangent === null) {
            // 第2点
            // 直线 ...
            latestTangent = getVectorByTwoPoints(latestPoint, thisPoint);
            drawLine(latestPoint, thisPoint);
        } else {
            // 第3点及以上
            // soma3线 ...
            const croterSeg = new Segment(latestPoint, thisPoint);  // 穿心线段
            const tangentVertical = getLineByPointAndVector(latestPoint, latestTangent).getVerticalLine(latestPoint) // 一交
            const bisector = croterSeg.getBiSector();   // 二交

            const center = tangentVertical.getIntersection(bisector);
            if (center === null) {
                // 无交点，用直线中点
                latestTangent = getVectorByTwoPoints(latestPoint, thisPoint);
                // 画直线逻辑...
                drawLine(latestPoint, thisPoint);
            } else {
                // 有交点，画弧线逻辑...
                // 双向量法判定方向
                const vs = getVectorByTwoPoints(center, latestPoint) // 起始边
                // 若起始边y值大于0
                let direction = 1;  // 正角度，逆时针
                if (vs.y > 0) {
                    if (latestTangent.x >= 0) {
                        direction = -1;
                    } else {
                        direction = 1;
                    }
                } else if (vs.y < 0) {
                    if (latestTangent.x >= 0) {
                        direction = 1;
                    } else {
                        direction = -1;
                    }
                } else {
                    // ==0;
                    if (vs.x < 0) {
                        if (latestTangent.y >= 0) {
                            direction = -1;
                        } else {
                            direction = 1;
                        }
                    } else {
                        if (latestTangent.y >= 0) {
                            direction = 1;
                        } else {
                            direction = -1;
                        }
                    }
                }
                const arc = new Arc(center, latestPoint, thisPoint, direction);
                arc.draw()
            // 改切线
                latestTangent = getLineByTwoPoints(center, thisPoint).getVerticalLine(thisPoint).directionVector();
            }

        }

    }

    latestPoint = thisPoint;
});