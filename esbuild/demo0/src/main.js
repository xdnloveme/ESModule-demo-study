import bar from './bar';
import foo from './foo';

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

delay(2000).then(() => {
    bar();
    foo();
})

