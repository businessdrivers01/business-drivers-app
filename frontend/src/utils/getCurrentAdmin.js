export const getCurrentAdmin = () => {
    const adminString = localStorage.getItem('admin');
    let adminObject;
    if (adminString) {
        adminObject = JSON.parse(adminString);
        // console.log(adminObject);
    } else {
        console.log('No admin found in localStorage');
    }
    const admin = adminObject
    // console.log("Admin", admin);
    return admin;
} 