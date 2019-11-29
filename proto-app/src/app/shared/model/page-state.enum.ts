
export enum PageState {

    // page header and content are completly hidden
    HIDDEN = 'HIDDEN',

    // page header is shown, but content is collapsed
    COLLAPSED = 'COLLAPSED',

    // show the editor, data are marked as DIRTY
    SHOW_EDITOR = 'SHOW_EDITOR',

    // show the viewer, data are read-only
    SHOW_VIEWER = 'SHOW_VIEWER',
}


