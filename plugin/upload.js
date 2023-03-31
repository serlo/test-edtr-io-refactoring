import * as React from 'react';
import { asyncScalar } from './scalar';
/**
 * @param defaultState - The default state
 * @public
 */
export function upload(defaultState) {
    const state = asyncScalar(defaultState, isTempFile);
    return {
        ...state,
        init(...args) {
            const s = state.init(...args);
            return {
                ...s,
                set(value) {
                    s.set(value);
                },
                isPending: isTempFile(s.value) && !!s.value.pending,
                upload(file, handler) {
                    const uploaded = handler(file);
                    s.set(defaultState, (resolve, reject, next) => {
                        const read = readFile(file);
                        let uploadFinished = false;
                        void read.then((loaded) => {
                            if (!uploadFinished) {
                                next(() => {
                                    return { uploadHandled: true, loaded };
                                });
                            }
                        });
                        uploaded
                            .then((uploaded) => {
                            uploadFinished = true;
                            return uploaded;
                        })
                            .then((uploaded) => {
                            resolve(() => {
                                return uploaded;
                            });
                        })
                            .catch(() => {
                            reject(() => {
                                return { uploadHandled: true, failed: file };
                            });
                        });
                    });
                    return uploaded;
                },
            };
        },
    };
}
function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (!e.target)
                return;
            const { result } = e.target;
            resolve({ file, dataUrl: result });
        };
        reader.readAsDataURL(file);
    });
}
/**
 * @param file - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 * @public
 */
export function usePendingFileUploader(file, uploadHandler) {
    usePendingFilesUploader([file], uploadHandler);
}
/**
 * @param files - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 * @public
 */
export function usePendingFilesUploader(files, uploadHandler) {
    const [uploading, setUploading] = React.useState(0);
    React.useEffect(() => {
        // everything uploaded already
        if (uploading >= files.length)
            return;
        const fileState = files[uploading];
        if (isTempFile(fileState.value) &&
            fileState.value.pending &&
            !fileState.value.uploadHandled) {
            fileState.value.uploadHandled = true;
            void fileState
                .upload(fileState.value.pending, uploadHandler)
                .catch(onDone)
                .then(onDone);
        }
        function onDone() {
            setUploading((currentUploading) => currentUploading + 1);
        }
    }, [files, uploadHandler, uploading]);
}
/**
 * @param state - The current {@link FileState | state}
 * @public
 */
export function isTempFile(state) {
    const file = state;
    return !!(file.pending || file.failed || file.loaded);
}
