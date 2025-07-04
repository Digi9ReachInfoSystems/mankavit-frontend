export const getCookiesData = () => {
    const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
    const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refreshToken='))
        ?.split('=')[1];
    const userId = document.cookie
        .split('; ')
        .find(row => row.startsWith('userId='))
    ?.split('=')[1];
    return { accessToken, refreshToken, userId };
};

export const clearCookies = () => {
    document.cookie = `accessToken=; path=/; max-age=0;`;
    document.cookie = `refreshToken=; path=/; max-age=0;`;
    document.cookie = `userId=; path=/; max-age=0;`;
    document.cookie = `deviceId=; path=/; max-age=0;`;
};