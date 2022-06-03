/*import React from 'react'

const ProgressBar = ({bgcolor1,bgcolor2,progress1,progress2,height}) => {
	
	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 50
	}
	
	const Childdiv1 = {
		height: '100%',
		width: `${progress1}%`,
		backgroundColor: bgcolor1,
	borderRadius:40,
		textAlign: 'right'
	}
    const Childdiv2 = {
		height: '100%',
		width: `${progress2}%`,
		backgroundColor: bgcolor2,
	borderRadius:40,
		textAlign: 'left'
	}
	
	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv1}>
		<span style={progresstext}>{`${progress1}%`}</span>
        <span style={progresstext}>{`${progress2}%`}</span>
	</div>

	</div>
	)
}

export default ProgressBar;
*/
import React from 'react'
// import './progressBar.module.css'

export default function ProgressBar(prop) {
    const total=(prop.yes+prop.no)
    const yesPer=(prop.yes/total)*100
    const noPer=(prop.no/total)*100
  return (<div style={{flexDirection:"column",display:"flex",justifyContent:'center',alignItems:'center',marginTop:20}}>
      <div style={{flexDirection:"row",display:'flex',justifyContent:'center',alignItems:'center'}}>
      {total? <p style={{marginRight:5}}>Yes</p>:null}
    <div style={{backgroundColor:"#0c1424",height:20,width:yesPer,borderTopLeftRadius:5,borderBottomLeftRadius:5}} ></div>
    <div   style={{backgroundColor:"#988f2a",height:20,width:noPer,borderTopRightRadius:5,borderBottomRightRadius:5}} ></div>
    {total? <p style={{marginLeft:5}}>No</p>:null}
    </div>
    {total ?<div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>{prop.yes} - </p>
    <p> {prop.no}</p></div>:null}
    
    </div>

  )
}
