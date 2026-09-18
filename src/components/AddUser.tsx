import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import type { FormEvent } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { addTodo } from "../api/todo.api"

interface Iprops{
  open:boolean,
  setOpen:(value:boolean)=>void
}

export function AddUser({open,setOpen}:Iprops) {
    const dispatch=useDispatch<AppDispatch>()

    const handelSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const target=e.target as HTMLFormElement
        const formData=new FormData()
        formData.append("name", (target.elements.namedItem("name") as HTMLInputElement).value)
        formData.append("description", (target.elements.namedItem("description") as HTMLInputElement).value)
        const files = (target.image as HTMLInputElement).files
        if(files){
          for (const file of files) {
            formData.append(`Images`,file)
          }
        }
        dispatch(addTodo(formData))
        setOpen(false)
        target.reset()
    }

  return (
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
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name"  />
            </Field>
            <Field>
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description"  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
