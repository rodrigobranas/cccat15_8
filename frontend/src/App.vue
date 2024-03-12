<script setup lang="ts">
	// View Model do MV* (C, VM, P)
	import { inject, reactive, ref } from 'vue';
	import AccountGateway from './infra/gateway/AccountGateway';
	import SignupForm from './domain/SignupForm';

	const signupForm = reactive(new SignupForm());
	const accountGateway: AccountGateway = inject("accountGateway")!;
	signupForm.register(function (event: any) {
		accountGateway.signup(event.data);
		signupForm.success = "Conta criada com sucesso";
	});

</script>

<template>
	<span class="step" @click="signupForm.setData()">Passo {{ signupForm.step }}</span>
	<br/>
	<span class="progress">{{ signupForm.calculateProgress() }}%</span>
	<br/>
	<span class="error">{{ signupForm.error }}</span>
	<br/>
	<span class="success">{{ signupForm.success }}</span>
	<br/>
	<div v-if="signupForm.step === 1">
		<input class="input-is-passenger" type="checkbox" v-model="signupForm.isPassenger"/> Passenger
	</div>
	<br/>
	<div v-if="signupForm.step === 2">
		<input class="input-name" type="text" v-model="signupForm.name" placeholder="Nome"/>
		<br/>
		<input class="input-email" type="text" v-model="signupForm.email" placeholder="Email"/>
		<br/>
		<input class="input-cpf" type="text" v-model="signupForm.cpf" placeholder="CPF"/>
		<br/>
	</div>
	<br/>
	<div v-if="signupForm.step === 3">
		<input class="input-password" type="text" v-model="signupForm.password" placeholder="Password"/>
		<br/>
		<input class="input-confirm-password" type="text" v-model="signupForm.confirmPassword" placeholder="Confirm Password"/>
		<br/>
	</div>
	<button v-if="signupForm.showPrevious()" class="button-previous" @click="signupForm.previous()">Anterior</button>
	<button v-if="signupForm.showNext()" class="button-next" @click="signupForm.next()">Próximo</button>
	<button v-if="signupForm.showSubmit()" class="button-submit" @click="signupForm.submit()">Confirmar</button>
</template>

<style>
</style>
