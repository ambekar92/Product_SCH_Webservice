const pool = require('../../config/db.js')



const getUsers = (request, response) => {
//var arr=[];
 var key={};
 // o[key]= [];
  pool.query('SELECT * FROM tb_info_name', (error, results) => {
      if (error) {
        throw error
      }
      key['data']=(results.rows);
      response.json(key)

      // for(i=0;i<results.rows.length;i++){
      //     o.push(results.rows[i])
      // }
      // key['data']=sto;
      // response.json(key);
     
    })
  }

  
  const getuser = (request, response) => {
    // const {id} = request;
    const {name,address,created_at} = request.body;
    pool.query('INSERT INTO public.tb_info_name (name,address,created_at) values ($1,$2,NOW())',[name,address], (error, results) => {
 
      if (error) {
        throw error
      }
      response.json(results)
      response.end(`User added with ID: ${results}`);
      // for(i=0;i<results.rows.length;i++){
      //     o[key].push(results.rows[i])
      // }
      // response.json(o)
     
    });
  }

  module.exports={
      getUsers,
      getuser
  }