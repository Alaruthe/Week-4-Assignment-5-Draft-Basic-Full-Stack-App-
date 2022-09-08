"use strict";

class ListTable extends React.Component{
  render(){
    const rows = [];
    let mykey = 1;
    this.props.dataset.forEach(
      (dataItem) => {
        console.log(dataItem);
        dataItem.key = mykey.toString();
        rows.push(
          <ListItem key={mykey.toString()} item={dataItem} />
        );
        mykey++;
      }
    );
    
    return (
      <table>
        <thread>
          <tr>
            <th>What's your Favorite Pizza?</th>
          </tr>
        </thread>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
class ListItem extends React.Component{
  render(){
    const item = this.props.item;
    return(
      <tr onClick={() => this.goItem()}>
        <td>{item.PizzaName}</td>
      </tr>
    );
  }
  goItem(){
    window.location.href='/item/'+this.props.item.key;
  }
}

class FullItem extends React.Component{
  render() {
    return(
      <div>
        <table>
          <thread>
            <th>Your Favorite Pizza</th>
          </thread>
          <tbody>
            <tr>
              <td>
                {this.props.dataset.PizzaName}
              </td>
              <td>
                <img src={this.props.dataset.link} alt="image" />
              </td>
            </tr>
          </tbody>
        </table>
        <p><a href="/list">» Return to List</a></p>
      </div>
    );
  }
}

fetch('/data')
  .then(
    function(response){
      if(response.ok){
        return response.json();
      } else{
        throw new Error('Network response was not Ok');
      }
    }
  )
.then(
  function(data){
    console.log(data.dataset);
    const root = ReactDOM.createRoot(document.getElementById('app'));
    const pageURL = window.location.pathname.split('/');
    console.log(pageURL);
    if(pageURL[1]==='item' && pageURL.length>2){
      const itemNum = Number(pageURL[2]);
      root.render(<FullItem dataset={data.dataset[itemNum -1]}/>);
    } else {
      root.render(<ListTable dataset={data.dataset} />);
    }
  }
)