/**
    Using 1-counter.md or 2-counter.md from the easy section, can you create a clock that shows you the current machine time?
    Can you make it so that it updates every second, and shows time in the following formats -
    HH:MM::SS (Eg. 13:45:23)
    HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

const clock = () => {
    const now = new Date();

    // 24 hours format
    const hours24 = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');

    // 12 hours format
    const hours12 = (((now.getHours() + 11) % 12) + 1).toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM'

    console.log(`\n${hours24}:${min}:${sec}`);
    console.log(`${hours12}:${min}:${sec} ${ampm}`);
}

setInterval(clock, 1000);