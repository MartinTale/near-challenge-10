import Big from "big.js";
import "regenerator-runtime/runtime";

import { initContract, login, logout } from "./utils";

const BOATLOAD_OF_GAS = "300000000000000";

window.addEventListener("DOMContentLoaded", (event) => {
	const catDonationAmount = document.getElementById("cat-donation-amount");
	const dogDonationAmount = document.getElementById("dog-donation-amount");
	const humanDonationAmount = document.getElementById(
		"human-donation-amount"
	);

	const catnewDonationAmount = document.getElementById("cat-donation");
	const dognewDonationAmount = document.getElementById("dog-donation");
	const humannewDonationAmount = document.getElementById("human-donation");

	const donateToCat = document.getElementById("cat-donate");
	const donateToDog = document.getElementById("dog-donate");
	const donateToHuman = document.getElementById("human-donate");

	donateToCat.onclick = async () => {
		try {
			console.log(
				{
					fund: "Cat",
				},
				BOATLOAD_OF_GAS,
				Big(catnewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);
			await window.contract.donate(
				{
					fund: "Cat",
				},
				BOATLOAD_OF_GAS,
				Big(catnewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);

			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	};
	donateToDog.onclick = async () => {
		try {
			console.log(
				{
					fund: "Dog",
				},
				BOATLOAD_OF_GAS,
				Big(dognewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);
			await window.contract.donate(
				{
					fund: "Dog",
				},
				BOATLOAD_OF_GAS,
				Big(dognewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);

			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	};
	donateToHuman.onclick = async () => {
		try {
			console.log(
				{
					fund: "Human",
				},
				BOATLOAD_OF_GAS,
				Big(humannewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);
			await window.contract.donate(
				{
					fund: "Human",
				},
				BOATLOAD_OF_GAS,
				Big(humannewDonationAmount.value || "0")
					.times(10 ** 24)
					.toFixed()
			);

			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	};

	document.querySelector("#sign-in-button").onclick = login;
	document.querySelector("#sign-out-button").onclick = logout;

	// Display the signed-out-flow container
	function signedOutFlow() {
		document.querySelector("#signed-out-flow").style.display = "block";
		document.querySelectorAll(".logged-in-display").forEach((el) => {
			el.style.display = "none";
		});
		document.querySelectorAll(".candidate").forEach((el) => {
			el.style.alignItems = "center";
		});
	}

	// Displaying the signed in flow container and fill in account-specific data
	function signedInFlow() {
		document.querySelector("#signed-in-flow").style.display = "block";

		document
			.querySelectorAll("[data-behavior=account-id]")
			.forEach((el) => {
				el.innerText = window.accountId;
			});

		document.querySelectorAll(".candidate").forEach((el) => {
			el.style.alignItems = "flex-end";
		});
		document.getElementById("balance").innerText =
			(window.accountBalance.available / 10 ** 24).toFixed(5) + " NEAR";

		document.querySelectorAll(".logged-in-display").forEach((el) => {
			el.style.display = "flex";
		});

		updateCandidates();
	}

	async function updateCandidates() {
		try {
			// make an update call to the smart contract
			const pets = await window.contract.viewPets();

			let total = 0;
			for (let i = 0; i < pets.length; i += 1) {
				if (pets[i].key == "Cat") {
					catDonationAmount.innerText = (
						Math.round(pets[i].value.donations * 10000) / 10000
					).toString();
					total += pets[i].value.donations;
				}
				if (pets[i].key == "Dog") {
					dogDonationAmount.innerText = (
						Math.round(pets[i].value.donations * 10000) / 10000
					).toString();
					total += pets[i].value.donations;
				}
				if (pets[i].key == "Human") {
					humanDonationAmount.innerText = (
						Math.round(pets[i].value.donations * 10000) / 10000
					).toString();
					total += pets[i].value.donations;
				}
			}

			document.getElementById("total-donations").innerText =
				total.toString();

			updateLogs();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	}

	const logListContainer = document.getElementById("log-list");
	async function updateLogs() {
		try {
			// make an update call to the smart contract
			let logs = await window.contract.viewLogs();

			logs = logs.reverse();

			logListContainer.innerHTML = "";

			for (let i = 0; i < logs.length; i += 1) {
				logListContainer.innerHTML += `<div class="log">
          <span>${logs[i].value.user}</span>
          <strong>${logs[i].value.action}</strong>
		  </div>`;
			}
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	}

	// `nearInitPromise` gets called on page load
	window.nearInitPromise = initContract()
		.then(() => {
			if (window.walletConnection.isSignedIn()) signedInFlow();
			else signedOutFlow();

			updateCandidates();
		})
		.catch(console.error);

	let s = {};
	s.a = document.getElementById("snowfall-element");
	s.b = s.a.getContext("2d");
	s.c = function () {
		this.a = Math.random() * 2 + 2;
		this.b = Math.random() * s.a.width - this.a - 1 + this.a + 1;
		this.c = this.b;
		this.d = Math.random() * 50 + 1;
		this.e = Math.random();
		this.f = Math.random() * Math.PI * 2;
		this.g = Math.random() * 1.5 + 0.5;
		this.i = Math.random() * s.a.height - this.a - 1 + this.a + 1;
		this.j = () => {
			if (this.i > s.a.height + this.a) {
				this.i = -this.a;
			} else {
				this.i += this.g;
			}
			this.f += 0.02;
			this.b = this.c + this.d * Math.sin(this.f);
			s.b.fillStyle = "rgba(255,255,255," + this.e + ")";
			s.b.fillRect(this.b, this.i, this.a, this.a);
		};
	};
	s.e = () => {
		s.a.width = window.innerWidth;
		s.a.height = window.innerHeight;
		s.d = [];
		for (
			let x = 0;
			x < Math.ceil((s.a.width * s.a.height) / 15000);
			x += 1
		) {
			s.d.push(new s.c());
		}
	};
	window.addEventListener("resize", s.e);
	s.f = () => {
		requestAnimationFrame(s.f);
		s.b.clearRect(0, 0, s.a.width, s.a.height);
		for (let x in s.d) {
			s.d[x].j();
		}
	};
	s.e();
	s.f();
});
