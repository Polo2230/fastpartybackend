const Company = require("../models/company.model.js");

// Obtener todas las empresas
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empresas', error });
  }
};

// Crear una nueva empresa
exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empresa', error });
  }
};

// Obtener una empresa por ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empresa', error });
  }
};

// Actualizar una empresa
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar empresa', error });
  }
};

// Eliminar una empresa
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json({ message: 'Empresa eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empresa', error });
  }
};

