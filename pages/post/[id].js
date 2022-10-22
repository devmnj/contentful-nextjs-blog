import { useRouter } from 'next/router'
import SinglePost from "../../Components/SinglePost";
import { GridSkelton } from "../../Components/Skeltons";
import RichText from "../../Components/RitchText"
import Image from 'next/image'

export async function getStaticPaths() {
    const res = await fetch('http:localhost:3000/api/posts')
    const posts = await res.json();

    const paths = posts.items.map((post) => ({
        params: { id: post.sys.id },
    }))
    return {
        paths, fallback: true // false or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    console.log(params)
    const res = await fetch(`http:localhost:3000/api/posts/${params.id}`)
    const post = await res.json();
    return {
        props: {
            post: post,
        }
    }
}
const Post = ({ post }) => {
    const router = useRouter()
    const { pid } = router.query

    return <>
        {/* {JSON.stringify(post)} */}
        <div className="   dark:bg-gray-800 max-w-6xl px-6 py-16 mx-auto space-y-12">
            <article className="  flex-col space-y-8 dark:bg-gray-800 dark:text-gray-50">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
                        {post.fields.title}
                    </h1>
                    <div>
                        <summary>{post.fields.summary}</summary>
                    </div>
                    <div
                        className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                        <div className="flex items-center md:space-x-2">

                            {/* <picture> */}
                                <img
                                src="https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                                className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                            />
                            {/* </picture> */}
                            <p className="text-sm">
                                Leroy Jenkins • July 19th, 2021
                            </p>
                        </div>
                        <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                            4 min read • 1,570 views
                        </p>
                    </div>
                </div>
                <div>
                    <picture>
                        <img src={post.fields.featuredImage.fields.file.url} alt="Feature image" />
                    </picture>
                </div>
                <div className="dark:text-gray-100">
                    <RichText document={post.fields?.content} />                  
                </div>
            </article>
            <div>
                <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-gray-400">
                    {/*<Tag name={props.post.tag} />*/}
                </div>
                <div className="space-y-2 text-white">
                    <h4 className="text-lg  font-semibold">Comments</h4>

                    {/*<PostComment comment={props.post.userComments[0].body} />*/}
                </div>
                <div className="space-y-2 mt-3 text-white">
                    <h4 className="text-lg  font-semibold">Related posts</h4>
                    {/*<RelatedPosts tag={props.post.tag} />*/}
                </div>
            </div>
        </div>
    </>
}

export default Post
