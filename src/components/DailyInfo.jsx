import { useMemo, useState } from 'react'

const sampleInfos = [
  { type: 'Prayer', title: 'Prayer Focus', body: 'Pray for unity in local families and healing for the sick.' },
  { type: 'Event', title: 'Event', body: 'Women’s fellowship this Saturday at 4pm — bring a friend.' },
  { type: 'Reflection', title: 'Reflection', body: 'Kindness seeds hope. Share a note of encouragement today.' },
]

export default function DailyInfo() {
  const [expanded, setExpanded] = useState(false)

  const todayInfo = useMemo(() => {
    const idx = new Date().getDate() % sampleInfos.length
    return sampleInfos[idx]
  }, [])

  return (
    <div className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-brand-primary/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-primary to-brand-primaryDark" />
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pl-2">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            {todayInfo.type}
          </div>
          <h3 className="text-xl font-bold text-ink mt-3 tracking-tight">{todayInfo.title}</h3>
          <div className="mt-2 text-ink/70 leading-relaxed transition-all duration-300">
            {expanded ? (
              <p className="animate-in fade-in slide-in-from-top-1">{todayInfo.body}</p>
            ) : (
              <p className="line-clamp-2">{todayInfo.body}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0 sm:min-w-[100px] border-t sm:border-t-0 sm:border-l border-ink/5 pt-4 sm:pt-0 sm:pl-4">
          <div className="text-xs font-semibold text-ink/50 uppercase tracking-widest">Today</div>
          <button 
            onClick={() => setExpanded((e) => !e)} 
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold bg-ink/5 text-ink/80 hover:bg-ink/10 hover:text-ink transition-colors"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  )
}
