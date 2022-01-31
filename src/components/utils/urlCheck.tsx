
export enum UrlTypes {
    IMAGE,
    ARENA,
    NOT_VALID
}

/**
 * Checking URL for arena url sanitizing
 * @param url arena link
 * @constructor
 */
export function UrlCheck(url: string) : UrlTypes {

    if (url.includes('are.na/')) {
        return UrlTypes.ARENA;
    } else if (['.jpg', '.jpeg', '.png'].find(type => url.includes(type))) {
        return UrlTypes.IMAGE;
    }

    return UrlTypes.NOT_VALID;

}
