import ResumeHeader from '@/components/layout/ResumeHeader'
import bg from '@/public/assets/public/images/bg-main.svg'

function Resumepage() {
    return (
        <>
            <ResumeHeader />
            <main className='h-screen' style={{ backgroundImage: `url("${bg}")` }}>
                {/* pdf file preview */}
                <div>

                </div>

                {/* review-side */}
                <div>

                </div>

            </main>
        </>
    )
}

export default Resumepage