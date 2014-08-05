/// <reference path="../../../common/infrastructure/time/time.ts" />

module KCW {
    export class Badge {
        private text: string;
        private colorCode: string;
        constructor(private date: Date, opt: Object = {}) {
            this.parse();
        }
        private parse() {
            var diff: number = this.date.getTime() - Date.now();
            if (diff < 1 * Time.Minute) return this.ofDead();
            if (diff < 1 * Time.Hour) return this.withMinute(diff)
            return this.withHour(diff);
        }
        private ofDead(count: number = 0) {
            this.text = String(count);
            this.colorCode = '#FF0000';
        }
        private withMinute(diff: number) {
            this.text = String(Math.floor(diff / Time.Minute)) + 'm';
            this.colorCode = '#0FABB1';
        }
        private withHour(diff: number) {
            this.text = String(Math.floor(diff / Time.Hour)) + 'h';
            this.colorCode = '#0FABB1';
        }
        public display() {
            console.log("chrome.badge.updateとかする", this);
        }
    }
}