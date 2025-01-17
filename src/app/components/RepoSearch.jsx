"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const RepoSearch = () => {
    const [username, setUsername] = useState("")
    const [repos, setRepos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const handleInputChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setUserInfo(null)
        try {
            const response = await fetch(`/api/github?username=${username}`)
            const data = await response.json()
            if (response.ok) {
                setRepos(data)
                const userResponse = await fetch(`https://api.github.com/users/${username}`)
                const userData = await userResponse.json()
                if (userResponse.ok) {
                    setUserInfo(userData)
                } else {
                    setError(userData.error)
                }
            } else {
                setError(data.error)
            }
        } catch (error) {
            setError("Error fetching data from GitHub API.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="search">
            <h2 className="text-center text-4xl font-bold text-white mb-4 mt-4">Github Repository Search</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
                <div>
                    <form onSubmit={handleSearch} action="" className="space-y-2 px-7 mb-2.5">
                        <label htmlFor="search" className="text-white text-sm font-medium block">
                            Username
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                id="search"
                                value={username}
                                onChange={handleInputChange}
                                required
                                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg flex-1 p-2.5"
                                placeholder="Enter username here" />
                            <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg flex-shrink-0">
                                <Image src="/images/search.png" width={20} height={20} alt="search-icon"></Image>
                            </button>
                        </div>
                    </form>
                    {userInfo && (
                        <div className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg grid grid-cols-3 w-full py-2.5 md:px-7'>
                            <div className='col-span-1'>
                                <a href={`https://github.com/${userInfo.login}`} target="_blank" rel="noopener noreferrer">
                                    <img src={userInfo.avatar_url} width={150} height={150} className='rounded-full' alt="User Avatar" />
                                </a>
                            </div>
                            <div className='col-span-2 px-1'>
                                <div>
                                    <a href={`https://github.com/${userInfo.login}`} target="_blank" rel="noopener noreferrer">
                                        <h1 className='text-2xl font-bold text-white'>{userInfo.name || userInfo.login}</h1>
                                    </a>
                                    <p className='text-white'>@{userInfo.login}</p>
                                    <p className='mt-3 text-white'>{userInfo.bio || 'No bio available'}</p>
                                    <div>Joined: {new Date(userInfo.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className='md:flex md:justify-between grid grid-cols-1 text-white w-full mt-3'>
                                    <div>
                                        <p>Repositories:</p>
                                        <p>{repos.length}</p>
                                    </div>
                                    <div>
                                        <p>Followers:</p>
                                        <p>{userInfo.followers}</p>
                                    </div>
                                    <div>
                                        <p>Following:</p>
                                        <p>{userInfo.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {loading ? (
                    <p className="text-white md:mt-8 px-7">Loading...</p>
                ) :
                    error ? (
                        <p className="text-red-500 md:mt-8 px-7">{error}</p>
                    ) : repos.length > 0 ? (
                        <div>
                            <p className="text-base text-white px-7 mb-2.5 md:px-0">Repositories:</p>
                            <div className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full py-2.5 px-7">
                                <ul className="space-y-2">
                                    {repos.map((repo) => (
                                        <li key={repo.id} className="text-white">
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary-500 break-all"
                                            >
                                                {repo.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white md:mt-8 px-7">No repositories found</p>
                    )}
            </div>
        </section>
    );
};

export default RepoSearch;
