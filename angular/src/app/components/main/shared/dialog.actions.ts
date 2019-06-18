export class DialogActions {
    public isVisibleEditorTask = false;
    public isVisibleViewTask = false;
    protected displayedDate: Date;

    public actionsDialog( action: any ): void {
        if ( action.type === 'close' ) {
            this.hideEditorTask();
            this.hideViewTask();
        }
    }

    public showEditorTask( event: any, day?: number ): void {
        this.isVisibleEditorTask = true;
    }

    public hideEditorTask = (): void => {
        this.isVisibleEditorTask = false;
    }

    public showViewTask( event: any ): void {
        this.isVisibleViewTask = true;
    }

    public hideViewTask = (): void => {
        this.isVisibleViewTask = false;
    };
}
