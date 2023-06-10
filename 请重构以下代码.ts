// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp(file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp(file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp(file: string): boolean {
    return true
}

interface File {
    filename: string;
    strategy: string;
}


const uploadFactory = {
    'ftp': (file) => {
        return uploadByFtp(file)
    },
    'sftp': (file) => {
        return new Promise((resolve, reject) => {
            uploadBySftp([file], ret => {
                ret ? resolve(true) : reject()
            })
        })
    },
    'http': (file) => {
        return Promise.resolve(uploadByHttp(file))
    }
}

function getFileMap(files, formatFunc) {
    let result: any[] = [];
    let formatMap = {
        '.txt': 'ftp',
        '.doc': 'http',
        '.exe': 'sftp'
    }
    files.forEach(item => {
        result.push({ filename: item, strategy: formatMap[formatFunc(item)] })
    });
    return result;
}

// 实现如下
function upload({ fileMap, cb }): Promise<boolean> {
    return Promise.all(fileMap.filter(file => {
        const format = cb(file.filename);
        return true
    }).map(file => {
        return uploadFactory[file.strategy](file.filename);

    })).then(() => {
        console.log('upload success.')
        return true
    })
}

function getExtFile(file: string) {
    const ext: string = file.match(/\.(\w+)$/)?.[1] ?? '';
    if (!ext) {
        throw new Error('文件暂不匹配')
    }
    return ext;
}
function extUpload(files: string[]) {
    const fileNameMap = getFileMap(files, getExtFile);
    upload({ fileMap: fileNameMap, cb: getExtFile });
}

const files = ['ftp_aaa.txt', 'ddd.doc', 'ccc.exe'];
extUpload(files);



