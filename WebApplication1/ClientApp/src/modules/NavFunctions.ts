export const toggleModes = (icon:any) => {
    document.body.classList.toggle('darkmode');
    return icon ? icon=false : icon=true 
}