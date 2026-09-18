import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { addImg } from '../api/todo.api'

interface Iprops{
  open:boolean,
  setOpen:(value:boolean)=>void,
  id:number
}

export default function AddImg({open,setOpen,id}:Iprops) {
     const dispatch=useDispatch()
     console.log();
     


    const handelSubmit=(e)=>{
            e.preventDefault()
            const formData=new FormData()
            const files = e.target.image.files
            console.log(files);
            
            for (const file of files) {
              formData.append(`Images`,file)
            }
            dispatch(addImg({id,formData}))
            console.log(formData);
            
            setOpen(false)
            e.target.reset()
        }

  return (
    <>
     <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="image">Image / File</Label>
              <Input id="image" multiple name="image" type="file" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog> 
    </>
  )
}
