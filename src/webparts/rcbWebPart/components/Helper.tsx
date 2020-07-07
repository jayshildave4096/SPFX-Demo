import {SPHttpClient, SPHttpClientResponse} from "@microsoft/sp-http";
declare interface Props{
    client:SPHttpClient,
    url:string
}

export default  async function CheckList(props:Props):Promise<string> {
    
    var msg=await props.client.get(`${props.url}/_api/web/lists/getByTitle('my1')/items`,SPHttpClient.configurations.v1,{
        headers:{
            'Accept': 'application/json;odata=nometadata',  
            'odata-version': '' 
        }
    }).then((response:SPHttpClientResponse)=>{
        if(response.status==404)
           return "LIST NOT FOUND"
        else
        return "LIST FOUND";
        
    })
    return msg;
  
      
}
