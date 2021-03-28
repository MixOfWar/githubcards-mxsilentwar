import './App.css';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function App() {
	const [user, setUser] = useState({});
	const [active, setActive] = useState(true);
	const [userInput, setUserInput] = useState('');
	const [searchUser, setSearchUser] = useState([]);

	useEffect(() => {
		fetch(`https://api.github.com/users/mxsilentwar`)
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

	const handleToggle = (e) => {
		e.preventDefault();
		setActive(!active);
	};

	const handleSearch = (e) => {
		setUserInput(e.target.value);
	};

	const searchGithubUsers = (e) => {
		e.preventDefault();
		fetch(`https://api.github.com/users/${userInput}`)
			.then((res) => res.json())
			.then((data) => setSearchUser(data));
	};

	return (
		<div className='App'>
			<Button
				variant='outlined'
				color='primary'
				onClick={(e) => handleToggle(e)}
			>
				Show Creator
			</Button>
			<input type='text' value={userInput} onChange={(e) => handleSearch(e)} />
			<Button
				variant='outlined'
				color='primary'
				onClick={(e) => searchGithubUsers(e)}
			>
				Search for user
			</Button>

			{active ? (
				<Card>
					<CardContent>
						<CardMedia
							style={{ height: '200px', width: '200px' }}
							component='img'
							height='200'
							image={user.avatar_url}
							title={`${user.login} avatar`}
						/>
						<Typography className='title'>{user.login}</Typography>
						<Typography className='bio'>{user.bio}</Typography>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
}

export default App;
