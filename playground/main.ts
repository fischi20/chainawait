
async function doThings() {
    sleep(1234).await

    return 1234
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


const a = doThings().await.toFixed(32)