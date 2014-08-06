
module KCW {
    export class Controller {
        public validation: JQueryDeferred = $.Deferred();
        public result: JQueryDeferred = $.Deferred();
        constructor(public params: any = {}) {}
        process(): JQueryPromise {
            this.validate().fail(() => {
                return this.result.reject();
            });
            return this.main();
        }
        // should be implemented in sub-class
        validate(): JQueryPromise {
            // reject if invalid
            return this.validation.resolve();
        }
        main() {
            // reject if error
            return this.result.resolve();
        }
    }
}
