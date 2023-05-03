type RequestHandeler<T> = (url:string)=>Promise<T>

type PromiseList = Array<Promise<any>>

export default async function asyncPool<T>(urls:Array<string>,limit:number,requestHandler:RequestHandeler<T>):Promise<Array<T>>{
    const exceting =new Set()
    const pool:Array<Promise<any>> =[]
    for(let url of urls){
        let request = Promise.resolve().then(()=>requestHandler(url))
        exceting.add(request)
        pool.push(request)
        const clean =()=>exceting.delete(request)
        request.then(clean)
        if(exceting.size>=limit){
            await  Promise.race(exceting)
        }
    }
    return Promise.all(pool)
}
