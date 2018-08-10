module.exports = function () {

    const fortunes = [
        'Heisenberg may have slept here...',
        'Wanna buy a duck?',
        'Say no, then negotiate.',
        'Time and tide wait for no man.',
        'To teach is to learn.',
        'Never ask the barber if you need a haircut.',
        'You will forget that you ever knew me.',
        'You will be run over by a beer truck.',
        'Fortune favors the lucky.',
        'Have a nice day!'
    ];

    const persons ={
        0:{
            firstname: 'Cesar',
            lastName: 'Bonel',
            age: 23
        },
        2:{
            firstname: 'Juan',
            lastName: 'Test',
            age: 22
        },
        3:{
            firstname: 'Pedro',
            lastName: 'Test',
            age: 28
        }
    }
    
    const x = Math.floor(Math.random() * fortunes.length);
    return fortunes[x];
    // return persons; 
};