
let editId=null;
// Create a new table row
function showEntries(obj){
    const expenseList = document.getElementById('expense-list');
    const expenseForm = document.getElementById('expense-form');
    const row = document.createElement('tr');
    
    row.setAttribute('data-id',obj.id)
    // Insert cells into the row
    row.innerHTML = `
        <td>${obj.amount}</td>
        <td>${obj.description}</td>
        <td>${obj.category}</td>
        <td>
            <button class="btn btn-secondary btn-sm edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
    `;

    // Append the row to the expense list
    expenseList.appendChild(row);
    expenseForm.reset()
}
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    
    axios.get("http://localhost:5050/get-entries/")
        .then((response)=>{
          console.log("getting the data in frontend")
            console.log(response)
            const newdata=response.data.allNewEntries
            //console.log(newEntries)
            for(let i=0;i<newdata.length;i++){
              //console.log(newdata[i])
              showEntries(newdata[i])
            }
        })
    })
    const expenseList = document.getElementById('expense-list');
    const expenseForm = document.getElementById('expense-form');
    // event for posting the data
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const obj={ amount, description, category }
        if(editId){
            axios.put(`http://localhost:/edit-entries/${editId}`,obj)
            .then((response)=>{
                console.log("Entry updated succesfully",response.data)
            })
            .catch(err=>{
                console.error("error updating entry",err)
            })
            editId=null
        }
        {
        console.log("here is the object that is parsing",obj)
        axios.post("http://localhost:5050/add-entries/",obj)
        .then((response)=>{
            console.log("response From server",response.data)
            showEntries(response.data.newEntries)
        })
        .catch((err)=>{
            console.log("Invalid response form server",err)
            document.body.innerHTML=document.body.innerHTML+"<h3>Something went wrong</h3>"
        }) 
    } 
    });

    // Event delegation for delete and edit buttons
    expenseList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            console.log("yet to delete the data")
            const row=event.target.closest('tr')
            const id=row.getAttribute('data-id')
            console.log("this the id to be deleted",id)
            axios.delete(`http://localhost:5050/delete-entries/${id}`)
            .then((response)=>{
                console.log("entry deleted successfully")
                event.target.closest('tr').remove();
            })
            .catch((err)=>{
                console.log("error in deleting entry",err)
            })
            
        } else if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const cells = row.children;
            const id=row.getAttribute('data-id')

            // Populate form with existing data
            document.getElementById('amount').value = cells[0].textContent;
            document.getElementById('description').value = cells[1].textContent;
            document.getElementById('category').value = cells[2].textContent;

            // set edit id for the current row
            editId=id
            row.remove()
        }
    });


