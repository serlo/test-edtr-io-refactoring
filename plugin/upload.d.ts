import { StateType } from './internal-plugin-state';
/**
 * @param defaultState - The default state
 * @public
 */
export declare function upload<T>(defaultState: T): UploadStateType<T>;
/** @public */
export type UploadStateType<T> = StateType<FileState<T>, FileState<T>, UploadStateReturnType<T>>;
/** @public */
export interface UploadStateReturnType<T> {
    get(): FileState<T>;
    value: FileState<T>;
    isPending: boolean;
    upload(file: File, handler: UploadHandler<T>): Promise<T>;
    set(value: FileState<T> | ((currentValue: FileState<T>) => FileState<T>)): void;
}
/**
 * @param file - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 * @public
 */
export declare function usePendingFileUploader<T>(file: UploadStateReturnType<T>, uploadHandler: UploadHandler<T>): void;
/**
 * @param files - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 * @public
 */
export declare function usePendingFilesUploader<T>(files: UploadStateReturnType<T>[], uploadHandler: UploadHandler<T>): void;
/** @public */
export type UploadHandler<T> = (file: File) => Promise<T>;
/** @public */
export type UploadValidator<E = unknown> = (file: File) => {
    valid: true;
} | {
    valid: false;
    errors: E;
};
/** @public */
export interface TempFile {
    uploadHandled?: boolean;
    pending?: File;
    failed?: File;
    loaded?: LoadedFile;
}
/** @public */
export type FileState<T> = T | TempFile;
/**
 * @param state - The current {@link FileState | state}
 * @public
 */
export declare function isTempFile<T>(state: FileState<T>): state is TempFile;
/** @public */
export interface LoadedFile {
    file: File;
    dataUrl: string;
}
