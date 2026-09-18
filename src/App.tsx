import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { CheckCircle2, Edit3, ImagePlus, Trash2, UserPlus, XCircle } from 'lucide-react'
import { AddUser } from './components/AddUser'
import AddImg from './components/AddImg'
import { EditUser } from './components/EditUser'
import { deleteImg, deleteTodo, getTodo } from './api/todo.api'
import { useDispatch, useSelector } from 'react-redux'

export default function App() {
  const { data = [], isloading } = useSelector((state: any) => state.Todo || state.todo)
  const [open, setOpen] = useState(false)
  const [openI, setOpenI] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [idx, setIdx] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [ide, setIde] = useState<number | string>('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodo() as any)
  }, [dispatch])

  const hanEdit = (e: any) => {
    setOpenE(true)
    setName(e.name)
    setDesc(e.description)
    setIde(e.id)
  }

  if (isloading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 font-medium tracking-wide">Loading data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <AddUser open={open} setOpen={setOpen} />
      <AddImg open={openI} setOpen={setOpenI} id={idx as any} />
      <EditUser
        setName={setName}
        setDesc={setDesc}
        open={openE}
        setOpen={setOpenE}
        id={ide}
        name={name}
        desc={desc}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task & User Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Рӯйхати ҳамаи корбарон ва вазифаҳо</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
        {data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Ҳеҷ чиз ёфт нашуд</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((e: any) => (
              <div
                key={e.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        e.isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {e.isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{e.id}</span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {e.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {e.description || 'Бе шарҳ'}
                  </p>
                  {e.images && e.images.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                        Images ({e.images.length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {e.images.map((img: any) => (
                          <div
                            key={img.id}
                            className="relative group/img aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
                          >
                            <img
                              src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                              alt=""
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-200"
                            />
                            <button
                              onClick={() => dispatch(deleteImg(img.id) as any)}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white hover:text-red-400 transition-opacity"
                              title="Delete Image"
                            >
                              <Trash2 className="w-4 h-4 drop-shadow" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 p-4 bg-slate-50 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1.5 hover:bg-white text-slate-700"
                    onClick={() => hanEdit(e)}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1.5 hover:bg-white text-slate-700"
                    onClick={() => {
                      setOpenI(true)
                      setIdx(e.id)
                    }}
                  >
                    <ImagePlus className="w-3.5 h-3.5" /> +Img
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 px-2.5"
                    onClick={() => dispatch(deleteTodo(e.id) as any)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
