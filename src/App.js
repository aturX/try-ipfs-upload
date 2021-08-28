import logo from './logo.svg';
import './App.css';
/* import the ipfs-http-client library */
import { create   } from 'ipfs-http-client';
import { useState } from 'react'

// const projectId = '1xM12Y5gGBnPeYVCAUEOus2BoIk1'
// const projectSecret = '1dbb36f6f873eee867950afa6177fe631'
// const auth =
//   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

/* Create an instance of the client */
// const client = ipfsClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth
//   }
// })
const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>IPFS Example</h1>
        <input
          type="file"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img alt="" src={fileUrl} width="600px" />
          )
        }
      </header>
    </div>
  );
}

export default App;
