import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
    note: {
        id: string
        date: Date
        content: string
    }
    onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
                <span className="text-sm font-medium text-slate-300">
                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    {note.content}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-red-400">
                        <X className="size-5" />
                    </Dialog.Close>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                            {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                        </span>
                        <p className="text-sm leading-6 text-slate-400">
                            {note.content}
                        </p>
                    </div>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
                            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
                        </AlertDialog.Trigger>

                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
                            <AlertDialog.Content className="fixed inset-0 top-auto md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[540px] bg-slate-700 md:rounded-md outline-none">
                                <AlertDialog.Title className="p-5 text-center">
                                    Deseja excluir esta nota?
                                </AlertDialog.Title>
                                <AlertDialog.Description className="bg-slate-900 p-5 md:text-left text-center">
                                    Essa ação não pode ser desfeita. Isso excluirá permanentemente a sua nota.
                                </AlertDialog.Description>
                                <div className="flex md:justify-end justify-center p-5 gap-5">
                                    <AlertDialog.Cancel
                                        className="bg-slate-800 py-2 px-4 text-center text-sm text-slate-300 rounded-md outline-none font-medium"
                                    >
                                        Cancelar
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action
                                        className="bg-slate-800 py-2 px-4 w-auto text-center text-sm text-red-400 rounded-md outline-none font-medium"
                                        onClick={() => onNoteDeleted(note.id)}
                                    >
                                        Excluir
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}