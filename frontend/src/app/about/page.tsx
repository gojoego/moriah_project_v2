export default function AboutPage(){
    return (
        <main className="max-w-3xl mx-auto py-12 px-4 space-y-12">
            <header className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold">
                    About The Moriah Project 
                </h1>
            </header>
            <section aria-labelledby="about-me">
                <h2 id="about-me" className="text-xl font-medium">
                    About Me
                </h2>
                <p className="mt-3 text-sm leading-relaxed">
                    My name is Joe. Born in the sun of San Diego and raised in the fog of San Francisco, I currently live in the
                    heat of the Texan sun. I am social worker who found himself immersed in the burgeoning tech scene of 
                    Silicon Valley. I eventually learned to code and decided to start building applications that could possibly 
                    help individuals with mental health struggles. As someone who has struggled with clinical depression since 
                    age 5, I strive to build products imbued with empathy, kindness and acceptance.  
                </p>
            </section>

            <section aria-labelledby="about-site">
                <h2 id="about-site" className="text-xl font-medium">
                    About This Website
                </h2>
                <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                            At the end of 2022, my friend Moriah passed away from suicide. We were not particularly close but her 
                            death had an incredible impact on me. After I moved cities, we lost touch. There were times I thought 
                            about texting her. It was usually after some intense workout because we had been workout buddies. But I never did. 
                    </p>
                    <p>
                        And I have never stopped wondering if I there was something I could have done to prevent her passing. Maybe, just maybe 
                        if I had reached out to her, maybe that one text would have made a difference. What could I have said? What could I 
                        have told her?             
                    </p>
                    <p>
                        My hope is that someone might be able to find answers to these questions in this forum. I built this space so 
                        that those in mourning could see that there are others experiencing a similar pain.
                    </p>
                    <p>
                        If you are here because you have lost someone, you have my sincere condolences. I hope this space helps in your 
                        grieving process and that we can all heal together.
                    </p>                    
                </div>

            </section>
        </main>
    )
}