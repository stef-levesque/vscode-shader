
export var rgPath: string = '';
export var hlslExtensions: string[] = [];

export function setRgPath(path: string) {
    rgPath = path;
}

export function getRgPath() {
    return rgPath;
}

export function sethlslExtensions(ext: string){
    hlslExtensions.push(ext);
}
