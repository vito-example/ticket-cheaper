export class Location {
    public id: number;
    public coordinateX: number;
    public coordinateY: number;
    public event: Event;

    constructor(id: number, coordinateX: number, coordinateY: number, event: Event) {
        this.id = id;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.event = event;
    }

    getDistance(x: number, y: number): number {
        // The distance between two points should be computed as the Manhattan distance.
        return Math.abs(this.coordinateX - x) + Math.abs(this.coordinateY - y);
    }
}