const express = require("express");

const data = {
  // employees: require('../model/employees.json'),
  contacts: require('../models/contacts.json'),
  // setEmployees: function (data) { this.employees = data }
  setContacts: function (data) { this.contacts = data }
}

const getContacts = (req, res) => {
  res.status(200).json(data.contacts);
}


const getContact = (req, res) => {
  const contact = data.contacts.find(cont => cont.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(400).json({ "message": `Contact ID ${req.params.id} not found` });
  }
  res.json(contact);
}


const createContact = (req, res) => {
  const newContact = {
    id: data.contacts?.length ? data.contacts[data.contacts.length - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    location: req.body.location
  }

  if (!newContact.firstname || !newContact.lastname || !newContact.email || !newContact.age || !newContact.location) {
    return res.status(400).json({ 'message': 'Please all details are required.' });
  }

  data.setContact([...data.contacts, newContact]);
  res.status(201).json(data.contacts);
}


const updateContact = (req, res) => {
  const contact = data.contacts.find(cont => cont.id === parseInt(req.body.id));
  if (!contact) {
    return res.status(400).json({ "message": `Contact ID ${req.body.id} not found` });
  }
  if (req.body.firstname) contact.firstname = req.body.firstname;
  if (req.body.lastname) contact.lastname = req.body.lastname;
  if (req.body.email) contact.email = req.body.email;
  if (req.body.age) contact.age = req.body.age;
  if (req.body.location) contact.location = req.body.location;
  const filteredArray = data.contacts.filter(cont => cont.id !== parseInt(req.body.id));
  const unsortedArray = [...filteredArray, contact];
  data.setContact(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.contacts);
}


const deleteContact = (req, res) => {
  const contact = data.contacts.find(cont => cont.id === parseInt(req.body.id));
  if (!contact) {
    return res.status(400).json({ "message": `Contact ID ${req.body.id} not found` });
  }
  const filteredArray = data.contacts.filter(cont => cont.id !== parseInt(req.body.id));
  data.setContacts([...filteredArray]);
  res.json(data.contacts);
}


module.exports =
  {getContacts, getContact, createContact, updateContact, deleteContact};
