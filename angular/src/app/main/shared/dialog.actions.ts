
export class DialogActions {
    public isVisibleEditorTask = false;
    public isVisibleViewTask = false;
    protected displayedDate: Date;
    public top: number;
    public left: number;

    public actionsDialog( action: any ) {
        if ( action.type === 'close' ) {
            this.hideEditorTask();
            this.hideViewTask();
        }
    }

    public showEditorTask( event: any ): void {
        this.isVisibleEditorTask = true;
    }

    public hideEditorTask = (): void => {
        this.isVisibleEditorTask = false;
    };

    public showViewTask( event: any ): void {
        this.isVisibleViewTask = true;
    }

    public hideViewTask = (): void => {
        this.isVisibleViewTask = false;
    };
}
